package com.loyalty.services;

import com.loyalty.dtos.LoyaltyLogDTO;
import com.loyalty.models.LoyaltyLog;
import com.loyalty.models.User;
import com.loyalty.repositories.LoyaltyLogRepository;
import com.loyalty.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class LoyaltyLogService {
	
	@Autowired
	private UserRepository userRepository;

    @Autowired
    private LoyaltyLogRepository logRepository;
    
    public List<LoyaltyLog> getAllLogs() {
        return logRepository.findAll();
    }


    public List<LoyaltyLog> getLogsByUserId(Long userId) {
        return logRepository.findByUserId(userId);
    }

    public LoyaltyLog saveLog(LoyaltyLogDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        LoyaltyLog log = new LoyaltyLog();
        log.setCantidad(dto.getCantidad());
        log.setTipo(dto.getTipo());
        log.setFecha(dto.getFecha() != null ? dto.getFecha() : LocalDateTime.now());
        log.setUser(user);

        LoyaltyLog savedLog = logRepository.save(log);

        user.getLoyaltyLogs().add(savedLog);
        if ("add".equalsIgnoreCase(dto.getTipo()) || "BONO".equalsIgnoreCase(dto.getTipo())) {
            user.setPuntos(user.getPuntos() + dto.getCantidad());
        }
        userRepository.save(user);

        return savedLog;
    }
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
    }


    
    public LoyaltyLog updateLog(Long logId, LoyaltyLogDTO dto) {
        LoyaltyLog log = logRepository.findById(logId)
                .orElseThrow(() -> new RuntimeException("Log no encontrado"));

        log.setCantidad(dto.getCantidad());
        log.setTipo(dto.getTipo());
        log.setFecha(dto.getFecha() != null ? dto.getFecha() : log.getFecha());

        return logRepository.save(log);
    }

    public void deleteLog(Long logId) {
        if (!logRepository.existsById(logId)) {
            throw new RuntimeException("Log no encontrado");
        }
        logRepository.deleteById(logId);
    }
    
    public List<LoyaltyLog> getLogsByBusiness(Long negocioId) {
        return logRepository.findByUserNegocioId(negocioId);
    }

    public long getTotalLogsByBusiness(Long negocioId) {
        return logRepository.countByUserNegocioId(negocioId);
    }

    public int getTotalPointsByBusiness(Long negocioId) {
        List<LoyaltyLog> logs = logRepository.findByUserNegocioId(negocioId);
        return logs.stream()
                .filter(log -> "ASIGNACION".equalsIgnoreCase(log.getTipo()))
                .mapToInt(LoyaltyLog::getCantidad)
                .sum();
    }

    public int getTotalPointsRedeemedByBusiness(Long negocioId) {
        List<LoyaltyLog> logs = logRepository.findByUserNegocioId(negocioId);
        return logs.stream()
                .filter(log -> "CANJE".equalsIgnoreCase(log.getTipo()))
                .mapToInt(LoyaltyLog::getCantidad)
                .sum();
    }
    }
