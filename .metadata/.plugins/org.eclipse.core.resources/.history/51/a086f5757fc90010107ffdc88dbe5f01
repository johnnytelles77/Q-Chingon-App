package com.loyalty.services;

import com.loyalty.dtos.*;
import com.loyalty.models.*;
import com.loyalty.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusinessDashboardService {

    @Autowired
    private BusinessService businessService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LoyaltyLogRepository loyaltyLogRepository;

    @Autowired
    private RewardConfigRepository rewardConfigRepository;

    /**
     * Obtiene la información completa del dashboard para un negocio dado su token JWT.
     */
    public DashboardInfoDTO getDashboardInfo(String token) {

        // Obtener el negocio autenticado desde el token
        Business business = businessService.getAuthenticatedBusinessEntity(token);
        if (business == null) throw new IllegalArgumentException("Negocio no encontrado");

        // Total de usuarios del negocio
        long totalUsers = userRepository.countByNegocioId(business.getId());

        // Últimos 10 movimientos de los usuarios del negocio
        List<LoyaltyLog> logs = loyaltyLogRepository.findByUserNegocioId(business.getId())
                .stream()
                .sorted((a, b) -> b.getFecha().compareTo(a.getFecha())) // ordenar descendente por fecha
                .limit(10)
                .collect(Collectors.toList());

        // Total de puntos asignados
        int totalPointsEarned = logs.stream()
                .filter(log -> "ASIGNACION".equalsIgnoreCase(log.getTipo()))
                .mapToInt(LoyaltyLog::getCantidad)
                .sum();

        // Total de puntos canjeados
        int totalPointsRedeemed = logs.stream()
                .filter(log -> "CANJE".equalsIgnoreCase(log.getTipo()))
                .mapToInt(LoyaltyLog::getCantidad)
                .sum();

        // Configuración de recompensas del negocio
        RewardConfig config = rewardConfigRepository.findByNegocioId(business.getId()).orElse(null);

        // Construir DTO de respuesta
        return DashboardInfoDTO.builder()
                .businessName(business.getNombre())
                .totalUsers(totalUsers)
                .totalPointsEarned(totalPointsEarned)
                .totalPointsRedeemed(totalPointsRedeemed)
                .recentActivities(
                        logs.stream()
                                .map(RecentActivityDTO::fromLoyaltyLog)
                                .collect(Collectors.toList())
                )
                .rewardConfig(config != null ? RewardConfigDTO.from(config) : null)
                .build();
    }
}