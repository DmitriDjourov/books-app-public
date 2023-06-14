package tech.ksergei.bookslibrary.controller;

import org.springframework.web.bind.annotation.*;

import tech.ksergei.bookslibrary.env.EnvDevelop;
import tech.ksergei.bookslibrary.requestmodels.ReviewRequest;
import tech.ksergei.bookslibrary.service.ReviewService;
import tech.ksergei.bookslibrary.utils.JWTParser;

@CrossOrigin(EnvDevelop.host)
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

  private ReviewService reviewService;

  public ReviewController(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  @GetMapping("/secure/user/book")
  public Boolean reviewBookByUser(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long bookId) throws Exception {
    String userEmail = JWTParser.extractEmail(token);

    if (userEmail == null) {
      throw new Exception("Такого пользователя не существует");
    }
    return reviewService.userReviewListed(userEmail, bookId);
  }

  @PostMapping("/secure")
  public void postReview(
      @RequestHeader(value = "Authorization") String token,
      @RequestBody ReviewRequest reviewRequest) throws Exception {
    String userEmail = JWTParser.extractEmail(token);
    if (userEmail == null) {
      throw new Exception("Такого пользователя не существует");
    }
    reviewService.postReview(userEmail, reviewRequest);
  }
}