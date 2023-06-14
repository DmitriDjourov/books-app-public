package tech.ksergei.bookslibrary.controller;

import org.springframework.web.bind.annotation.*;

import tech.ksergei.bookslibrary.env.EnvDevelop;
import tech.ksergei.bookslibrary.requestmodels.AddBookRequest;
import tech.ksergei.bookslibrary.service.AdminService;
import tech.ksergei.bookslibrary.utils.JWTParser;

@CrossOrigin(EnvDevelop.host)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

  private AdminService adminService;

  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  @PostMapping("/secure/add/book")
  public void postBook(
      @RequestHeader(value = "Authorization") String token,
      @RequestBody AddBookRequest addBookRequest) throws Exception {
    String admin = JWTParser.extractUserType(token);
    if (admin == null
        || !admin.equals("admin")) {
      throw new Exception("Вы не администратор");
    }
    adminService.postBook(addBookRequest);
  }

  @DeleteMapping("/secure/delete/book")
  public void deleteBook(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long bookId) throws Exception {
    String admin = JWTParser.extractUserType(token);
    if (admin == null
        || !admin.equals("admin")) {
      throw new Exception("Вы не администратор");
    }
    adminService.deleteBook(bookId);
  }

  @PutMapping("/secure/increase/book/count")
  public void incBookCount(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long bookId) throws Exception {
    String admin = JWTParser.extractUserType(token);
    if (admin == null ||
        !admin.equals("admin")) {
      throw new Exception("Вы не администратор");
    }
    adminService.incBookCount(bookId);
  }

  @PutMapping("/secure/decrease/book/count")
  public void decBookCount(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long bookId) throws Exception {
    String admin = JWTParser.extractUserType(token);
    if (admin == null
        || !admin.equals("admin")) {
      throw new Exception("Вы не администратор");
    }
    adminService.decBookCount(bookId);
  }
}