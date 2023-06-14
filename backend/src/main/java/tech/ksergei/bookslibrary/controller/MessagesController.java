package tech.ksergei.bookslibrary.controller;

import org.springframework.web.bind.annotation.*;

import tech.ksergei.bookslibrary.entity.Message;
import tech.ksergei.bookslibrary.env.EnvDevelop;
import tech.ksergei.bookslibrary.responsemodels.AdminQuestionRequest;
import tech.ksergei.bookslibrary.service.MessagesService;
import tech.ksergei.bookslibrary.utils.JWTParser;

@CrossOrigin(EnvDevelop.host)
@RestController
@RequestMapping("/api/messages")
public class MessagesController {

  private MessagesService messagesService;

  public MessagesController(MessagesService messagesService) {
    this.messagesService = messagesService;
  }

  @PostMapping("/secure/send/message")
  public void postMessage(
      @RequestHeader(value = "Authorization") String token,
      @RequestBody Message messageRequest) {
    String userEmail = JWTParser.extractEmail(token);
    messagesService.postMessage(messageRequest, userEmail);
  }

  @PutMapping("/secure/admin/message")
  public void putMessage(
      @RequestHeader(value = "Authorization") String token,
      @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
    String userEmail = JWTParser.extractEmail(token);
    String admin = JWTParser.extractUserType(token);
    if (admin == null
        || !admin.equals("admin")) {
      throw new Exception("Страница только для админа");
    }
    messagesService.putMessage(adminQuestionRequest, userEmail);
  }
}