package com.loyalty.dtos;

import com.loyalty.models.LoyaltyLog;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class RecentActivityDTO {
    private String type;
    private int points;
    private String customerName;
    private LocalDateTime createdAt;

    public static RecentActivityDTO fromLoyaltyLog(LoyaltyLog log) {
        return RecentActivityDTO.builder()
                .type(log.getTipo())
                .points(log.getCantidad())
                .customerName(log.getUser().getNombre())
                .createdAt(log.getFecha())
                .build();
    }
}
