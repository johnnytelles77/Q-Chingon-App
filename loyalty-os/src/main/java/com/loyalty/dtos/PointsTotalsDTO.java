package com.loyalty.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointsTotalsDTO {
    private int totalEarned;
    private int totalRedeemed;
    private int netPoints;
}