package com.loyalty.utils;

import com.loyalty.dtos.BusinessDTO;
import com.loyalty.dtos.UserDTO;
import com.loyalty.models.Business;
import com.loyalty.models.User;

import java.util.List;
import java.util.stream.Collectors;

public class Mapper {


    public static BusinessDTO toBusinessDTO(Business business) {
        if (business == null) return null;

        BusinessDTO dto = new BusinessDTO();
        dto.setNombre(business.getNombre());
        dto.setEmail(business.getEmail());
        dto.setRole(business.getRole());

        return dto;
    }


    public static UserDTO toUserDTO(User user) {
        if (user == null) return null;

        UserDTO dto = new UserDTO();
        dto.setNombre(user.getNombre());
        dto.setEmail(user.getEmail());
        dto.setTelefono(user.getTelefono());
        dto.setPuntos(user.getPuntos());

        // Asignar solo el ID del negocio si existe
        if (user.getNegocio() != null) {
            dto.setBusinessId(user.getNegocio().getId());
        }

        return dto;
    }


    public static List<UserDTO> toUserDTOList(List<User> users) {
        return users.stream()
                    .map(Mapper::toUserDTO)
                    .collect(Collectors.toList());
    }


    public static List<BusinessDTO> toBusinessDTOList(List<Business> businesses) {
        return businesses.stream()
                         .map(Mapper::toBusinessDTO)
                         .collect(Collectors.toList());
    }
}