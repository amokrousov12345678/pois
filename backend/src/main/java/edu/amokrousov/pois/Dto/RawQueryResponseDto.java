package edu.amokrousov.pois.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RawQueryResponseDto {
    private List result;
    private Integer affectedRows;
    private String error;
}
