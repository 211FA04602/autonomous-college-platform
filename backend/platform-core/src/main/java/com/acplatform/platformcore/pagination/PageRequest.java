package com.acplatform.platformcore.pagination;

/**
 * Shared pagination request for list endpoints (constitution rule 12). {@code page} is zero-based.
 */
public record PageRequest(int page, int size) {

  public static final int MAX_SIZE = 200;

  public PageRequest {
    if (page < 0) {
      throw new IllegalArgumentException("page must be >= 0");
    }
    if (size <= 0 || size > MAX_SIZE) {
      throw new IllegalArgumentException("size must be between 1 and " + MAX_SIZE);
    }
  }
}
