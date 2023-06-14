package tech.ksergei.bookslibrary.responsemodels;

import lombok.Data;
import tech.ksergei.bookslibrary.entity.Book;

@Data
public class ShelfCurrentLoansResponse {

  public ShelfCurrentLoansResponse(Book book, int daysLeft) {
    this.book = book;
    this.daysLeft = daysLeft;
  }

  private Book book;

  private int daysLeft;
}