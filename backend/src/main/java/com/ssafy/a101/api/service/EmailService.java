package com.ssafy.a101.api.service;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {

    @Autowired
    JavaMailSender emailSender;

    public static final String ePw = createKey();

    private MimeMessage createMessage(String to)throws Exception{
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to); //보내는 대상
        message.setSubject("[파충류치원] 회원 가입 인증 코드"); //제목

        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h1>[파충류치원] 회원 가입 인증 코드입니다.</h1>";
        msgg+= "<p>아래 코드를 복사해 입력해주세요<p>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgg+= "<div style='font-size:130%'>";
        msgg+= "CODE : <strong>";
        msgg+= ePw+"</strong><div><br/> ";
        msgg+= "</div>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("younprizee@gmail.com","파충류치원"));//보내는 사람

        return message;
    }

    private MimeMessage alarmMessage(String to, String alarmName) throws Exception {
        MimeMessage  message = emailSender.createMimeMessage();

        message.addRecipients(RecipientType.TO, to); //보내는 대상
        message.setSubject("[파충류치원] " + alarmName + " 알림"); //제목

        String msgg="";
        msgg+= "<div style='margin:20px;'>";
        msgg+= "<h1>[파충류치원] 먹이 알림입니다.</h1>";
        msgg+= "<div style='font-size:130%'><strong>";
//        msgg+= "<strong>";
        msgg+= alarmName + "</strong><div><br/> ";
        msgg+= "<p>감사합니다.<p>";
        message.setText(msgg, "utf-8", "html");//내용
        message.setFrom(new InternetAddress("younprizee@gmail.com","파충류치원"));//보내는 사람

        return message;
    }

    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

    @Async
    public String sendSimpleMessage(String to)throws Exception {
        MimeMessage message = createMessage(to);
        try{ //예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }

    @Async
    public String sendAlarmMessage(String to, String alarmName) throws Exception {
        MimeMessage message = alarmMessage(to, alarmName);
        try{ //예외처리
            emailSender.send(message);
        }catch(MailException es){
            es.printStackTrace();
            throw new IllegalArgumentException();
        }
        return ePw;
    }
}