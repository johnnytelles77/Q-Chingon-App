package com.loyalty.dtos;

import com.loyalty.models.RewardConfig;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RewardConfigDTO {

    private Long negocioId;
    private int puntosNecesarios;
    private String mensajeProgreso;

    // Convertir entidad -> DTO
    public static RewardConfigDTO from(RewardConfig config) {
        return RewardConfigDTO.builder()
                .negocioId(config.getNegocioId())
                .puntosNecesarios(config.getPuntosNecesarios())
                .mensajeProgreso(config.getMensajeProgreso())
                .build();
    }

    // Convertir DTO -> Entidad
    public RewardConfig toEntity() {
        RewardConfig rc = new RewardConfig();
        rc.setNegocioId(this.negocioId);
        rc.setPuntosNecesarios(this.puntosNecesarios);
        rc.setMensajeProgreso(this.mensajeProgreso);
        return rc;
    }
}