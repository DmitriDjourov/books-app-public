package tech.ksergei.bookslibrary.responsemodels;

import lombok.Data;

@Data
public class AdminQuestionRequest {
  private Long id;
  private String response;
}