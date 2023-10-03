package com.ssafy.a101;

import com.ssafy.a101.api.request.UpdateAlarmRequest;
import com.ssafy.a101.api.request.UpdateCageRequest;
import com.ssafy.a101.api.service.AlarmService;
import com.ssafy.a101.api.service.CageService;
import com.ssafy.a101.api.service.EmailService;
import com.ssafy.a101.api.service.SmsService;
import com.ssafy.a101.config.MqttPubConfig;
import com.ssafy.a101.db.entity.Cage;
import com.ssafy.a101.db.entity.Message;
import com.ssafy.a101.db.entity.User;
import com.ssafy.a101.db.repository.AlarmRepository;
import com.ssafy.a101.db.repository.AutoSetRepository;
import com.ssafy.a101.db.repository.CageRepository;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;

@SpringBootApplication
@EnableScheduling
public class A101Application {
	@Autowired
	private ApplicationContext context;
	@Autowired
	private EmailService emailService;
	@Autowired
	private AlarmService alarmService;
	@Autowired
	private CageService cageService;
	@Autowired
	private SmsService smsService;

	public static void main(String[] args) throws MqttException {
		ConfigurableApplicationContext context = SpringApplication.run(A101Application.class, args);
	}

	@Transactional
	@Scheduled(cron = "0 * * * * *")
	public void sendAlarms() throws Exception {
		AlarmRepository alarmRepository = context.getBean(AlarmRepository.class);
		CageRepository cageRepository = context.getBean(CageRepository.class);
		String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:00")); //21:16:42
		alarmRepository.findAll().forEach((alarm -> {
			String recent = new SimpleDateFormat("yyyy-MM-dd HH:mm:00").format(alarm.getRecent());
			// 현재 시간과 설정 시간이 같으면
			// 1. 알림 보내기
			// 2. recent update
			if (currentTime.equals(recent)) {
				// 알림 보내기
				Long cageId = alarm.getCageId();
				Cage cage = cageRepository.findById(cageId).get();
				User user = cage.getId();
				try {
					Message sms = new Message(user.getNumber());
					smsService.sendAlarm(sms, alarm.getName());
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
				// recent 값 update
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(alarm.getRecent());
 				calendar.add(Calendar.MINUTE, alarm.getCycle().intValue());

				UpdateAlarmRequest updateAlarmRequest = new UpdateAlarmRequest();
				updateAlarmRequest.setName(alarm.getName());
				updateAlarmRequest.setCycle(alarm.getCycle());
				updateAlarmRequest.setRecent(calendar.getTime());
				alarmService.update(alarm.getArm_id(), updateAlarmRequest);
			}
		}));
	}
	@Transactional
	@Scheduled(cron = "0 * * * * *")
	public void checkAlarms() throws MqttException {
		MqttPubConfig sender = new MqttPubConfig();
		LocalTime currentTime = LocalTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:00");
		String formattedTime = currentTime.format(formatter);
		AutoSetRepository autoSetRepository = context.getBean(AutoSetRepository.class);
		autoSetRepository.findAll().forEach((autoSet -> {
			UpdateCageRequest updateCageRequest = new UpdateCageRequest();
			if (autoSet.getTime().equals(formattedTime)) {
				//mqtt 통신 부분 / start 까지
				new Thread(new Runnable() {
				Long temp = autoSet.getSet_temp();
				Long hum = autoSet.getSet_hum();
				Long uv = autoSet.getSet_id();

					@Override
					public void run() {
						String msg = "{" +
								"\"Temp\"" + ":" + "\"" + temp + "\"" +
								",\"Humid\"" + ":" + "\"" + hum + "\"" +
								",\"uv\"" + ":" + "\"" + uv + "\"" +
								"}";
						sender.send("1/setval", msg);  //  토픽,  보낼 메세지
						sender.close(); // 작업 완료되면 종료
					}
				}).start();
				updateCageRequest.setSet_temp(autoSet.getSet_temp());
				updateCageRequest.setSet_hum(autoSet.getSet_hum());
				updateCageRequest.setSet_uv(autoSet.getSet_uv());
				cageService.updateEnv(autoSet.getCageId(), updateCageRequest);
			}
		}));
	}
}
