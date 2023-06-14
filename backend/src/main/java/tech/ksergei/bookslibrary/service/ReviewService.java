package tech.ksergei.bookslibrary.service;

import java.sql.Date;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tech.ksergei.bookslibrary.dao.ReviewRepository;
import tech.ksergei.bookslibrary.entity.Review;
import tech.ksergei.bookslibrary.requestmodels.ReviewRequest;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReviewService {

  private ReviewRepository reviewRepository;

  @Autowired
  public ReviewService(ReviewRepository reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  public void postReview(
      String userEmail,
      ReviewRequest reviewRequest) throws Exception {
    Review validateReview = reviewRepository.findByUserEmailAndBookId(
        userEmail, reviewRequest.getBookId());

    if (validateReview != null) {
      throw new Exception("Повторный обзор");
    }

    Review review = new Review();
    review.setBookId(reviewRequest.getBookId());
    review.setRating(reviewRequest.getRating());
    review.setUserEmail(userEmail);
    if (reviewRequest.getReviewDescription().isPresent()) {
      review.setReviewDescription(reviewRequest.getReviewDescription().map(
          Object::toString).orElse(null));
    }
    review.setDate(Date.valueOf(LocalDate.now()));
    reviewRepository.save(review);
  }

  public Boolean userReviewListed(String userEmail, Long bookId) {
    Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
    return validateReview != null;
  }
}