package com.acplatform.platformcore.pagination;

import java.util.List;

/** Shared pagination response envelope for list endpoints (constitution rule 12). */
public record PageResponse<T>(
    List<T> content, int page, int size, long totalElements, int totalPages) {

  public static <T> PageResponse<T> of(List<T> content, int page, int size, long totalElements) {
    int totalPages = (size == 0) ? 0 : (int) Math.ceil((double) totalElements / size);
    return new PageResponse<>(content, page, size, totalElements, totalPages);
  }
}
