package com.acplatform.platformcore.pagination;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import org.junit.jupiter.api.Test;

class PageResponseTest {

  @Test
  void computesTotalPagesFromTotalElementsAndSize() {
    PageResponse<String> response = PageResponse.of(List.of("a", "b"), 0, 2, 5);

    assertThat(response.totalPages()).isEqualTo(3);
  }

  @Test
  void rejectsSizeAboveMax() {
    assertThatThrownBy(() -> new PageRequest(0, PageRequest.MAX_SIZE + 1))
        .isInstanceOf(IllegalArgumentException.class);
  }

  @Test
  void rejectsNegativePage() {
    assertThatThrownBy(() -> new PageRequest(-1, 20)).isInstanceOf(IllegalArgumentException.class);
  }
}
