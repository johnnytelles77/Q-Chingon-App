package com.loyalty.controllers;

import com.loyalty.dtos.LoyaltyLogDTO;
import com.loyalty.dtos.PointsTotalsDTO;
import com.loyalty.services.PointsService;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.*;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/points")
@Tag(name = "Points Management", description = "Endpoints to manage point history and totals")
@CrossOrigin(origins = "*")
public class PointsController {

    @Autowired
    private PointsService pointsService;

    @Operation(summary = "Historial completo de puntos del negocio",
               description = "Devuelve todas las transacciones de puntos del negocio autenticado")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Historial obtenido correctamente",
            content = @Content(schema = @Schema(implementation = LoyaltyLogDTO.class))),
        @ApiResponse(responseCode = "401", description = "Token inválido o expirado"),
        @ApiResponse(responseCode = "404", description = "Negocio no encontrado"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/history/business")
    public ResponseEntity<?> getBusinessHistory(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size,
            @RequestParam(required = false) String tipo) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token faltante o inválido");
            }
            String token = authHeader.substring(7).trim();
            Page<LoyaltyLogDTO> logs = pointsService.getBusinessHistory(token, page, size, tipo);
            return ResponseEntity.ok(logs);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expirado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }

    @Operation(summary = "Totales de puntos del negocio",
               description = "Devuelve el total de puntos ganados, redimidos y el balance")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Totales obtenidos correctamente",
            content = @Content(schema = @Schema(implementation = PointsTotalsDTO.class))),
        @ApiResponse(responseCode = "401", description = "Token inválido o expirado"),
        @ApiResponse(responseCode = "404", description = "Negocio no encontrado"),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/totals")
    public ResponseEntity<?> getBusinessTotals(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token faltante o inválido");
            }
            String token = authHeader.substring(7).trim();
            PointsTotalsDTO totals = pointsService.getBusinessTotals(token);
            return ResponseEntity.ok(totals);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token expirado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
        }
    }
}

