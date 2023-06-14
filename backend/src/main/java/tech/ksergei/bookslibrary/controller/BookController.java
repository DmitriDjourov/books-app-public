package tech.ksergei.bookslibrary.controller;

import org.springframework.web.bind.annotation.CrossOrigin;

import tech.ksergei.bookslibrary.env.EnvDevelop;
import tech.ksergei.bookslibrary.responsemodels.ShelfCurrentLoansResponse;
import tech.ksergei.bookslibrary.service.BookService;
import tech.ksergei.bookslibrary.entity.Book;
import tech.ksergei.bookslibrary.utils.JWTParser;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(EnvDevelop.host)
@RestController
@RequestMapping("/api/books")
public class BookController {

  private BookService bookService;

  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  @PutMapping("/secure/checkout")
  public Book checkoutBook(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long bookId) throws Exception {
    String userEmail = JWTParser.extractEmail(token);
    return bookService.checkoutBook(userEmail, bookId);
  }

  @GetMapping("/secure/ischeckout/byuser")
  public Boolean checkoutBookByUser(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long bookId) {
    String userEmail = JWTParser.extractEmail(token);
    return bookService.checkoutBookByUser(userEmail, bookId);
  }

  @GetMapping("/secure/currentcheckout/count")
  public int currentCheckoutCount(
      @RequestHeader(value = "Authorization") String token) {
    String userEmail = JWTParser.extractEmail(token);
    return bookService.currentCheckoutCount(userEmail);
  }

  @GetMapping("/secure/currentloans")
  public List<ShelfCurrentLoansResponse> currentLoans(
      @RequestHeader(value = "Authorization") String token)
      throws Exception {
    String userEmail = JWTParser.extractEmail(token);
    return bookService.currentLoans(userEmail);
  }

  @GetMapping("/secure/currentloans/count")
  public int currentLoansCount(@RequestHeader(value = "Authorization") String token) {
    String userEmail = JWTParser.extractEmail(token);
    return bookService.currentLoansCount(userEmail);
  }

  @PutMapping("/secure/return")
  public void returnBook(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long bookId) throws Exception {
    String userEmail = JWTParser.extractEmail(token);
    bookService.returnBook(userEmail, bookId);
  }

  @PutMapping("/secure/renew/")
  public void renewLoan(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long bookId) throws Exception {
    String userEmail = JWTParser.extractEmail(token);
    bookService.renewLoan(userEmail, bookId);
  }
}