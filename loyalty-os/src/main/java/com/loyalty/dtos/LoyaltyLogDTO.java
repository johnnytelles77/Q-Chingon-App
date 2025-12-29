package com.loyalty.dtos;

import lombok.Data;
import java.time.LocalDateTime;

import com.loyalty.models.LoyaltyLog;

@Data
public class LoyaltyLogDTO {
    private int cantidad;
    private String tipo;
    private LocalDateTime fecha;
    private Long userId;

    // Usamos 'from' porque varios servicios y controladores lo invocaban como LoyaltyLogDTO::from
    public static LoyaltyLogDTO from(LoyaltyLog log) {
        LoyaltyLogDTO dto = new LoyaltyLogDTO();
        dto.setCantidad(log.getCantidad());
        // Mantengo tipos consistentes: ASIGNACION / CANJE (puedes adaptarlo a 'earned'/'redeemed' si quieres)
        dto.setTipo(log.getTipo());
        dto.setFecha(log.getFecha());
        dto.setUserId(log.getUser() != null ? log.getUser().getId() : null);
        return dto;
    }
}
