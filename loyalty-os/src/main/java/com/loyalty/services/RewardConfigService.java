package com.loyalty.services;

import com.loyalty.dtos.RewardConfigDTO;
import com.loyalty.models.Business;
import com.loyalty.models.RewardConfig;
import com.loyalty.repositories.BusinessRepository;
import com.loyalty.repositories.RewardConfigRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardConfigService {

    @Autowired
    private RewardConfigRepository rewardRepo;

    @Autowired
    private BusinessRepository businessRepo;

    // Obtener todos (devuelve entidades; el controller puede mapear a DTO si prefiere)
    public List<RewardConfig> getAll() {
        return rewardRepo.findAll();
    }

    // Obtener por id (entidad)
    public RewardConfig getById(Long id) {
        return rewardRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("RewardConfig not found with ID: " + id));
    }

    // Obtener por negocioId (entidad)
    public RewardConfig getByNegocioId(Long negocioId) {
        return rewardRepo.findByNegocioId(negocioId)
                .orElseThrow(() -> new EntityNotFoundException("No RewardConfig found for negocioId " + negocioId));
    }

    // Crear a partir de DTO -> devuelve entidad creada
    public RewardConfig create(RewardConfigDTO dto) {
        if (dto == null) throw new IllegalArgumentException("DTO no puede ser null");

        // opcional: validar que exista el negocio si dto.negocioId no es null
        if (dto.getNegocioId() != null) {
            Business negocio = businessRepo.findById(dto.getNegocioId())
                    .orElseThrow(() -> new EntityNotFoundException("Negocio no encontrado con ID " + dto.getNegocioId()));
            RewardConfig rc = dto.toEntity();
            rc.setNegocio(negocio);
            return rewardRepo.save(rc);
        } else {
            RewardConfig rc = dto.toEntity();
            return rewardRepo.save(rc);
        }
    }

    // Actualizar parcialmente (devuelve entidad actualizada)
    public RewardConfig updateConfig(Long id, RewardConfigDTO dto) {
        RewardConfig config = rewardRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("RewardConfig not found with ID: " + id));

        if (dto.getPuntosNecesarios() != 0) { // si 0 es valor válido para ti, cambia la condición
            config.setPuntosNecesarios(dto.getPuntosNecesarios());
        }

        if (dto.getMensajeProgreso() != null) {
            config.setMensajeProgreso(dto.getMensajeProgreso());
        }

        if (dto.getNegocioId() != null) {
            Business negocio = businessRepo.findById(dto.getNegocioId())
                    .orElseThrow(() -> new EntityNotFoundException("Negocio no encontrado con ID " + dto.getNegocioId()));
            config.setNegocioId(dto.getNegocioId());
            config.setNegocio(negocio);
        }

        return rewardRepo.save(config);
    }

    // Eliminar
    public void delete(Long id) {
        if (!rewardRepo.existsById(id)) {
            throw new EntityNotFoundException("RewardConfig not found with ID: " + id);
        }
        rewardRepo.deleteById(id);
    }
}