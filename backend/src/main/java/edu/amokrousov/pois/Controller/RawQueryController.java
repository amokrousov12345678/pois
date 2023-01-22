package edu.amokrousov.pois.Controller;

import edu.amokrousov.pois.Dto.RawQueryResponseDto;
import edu.amokrousov.pois.Dto.RawQueryDto;
import edu.amokrousov.pois.Service.RawQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@PreAuthorize("hasAuthority('PRIV_SUDO')")
public class RawQueryController {
    @Autowired
    private RawQueryService rawQueryService;

    @PostMapping("/api/rawQuery/execute")
    public ResponseEntity<RawQueryResponseDto> rawQueryExecute(@RequestBody RawQueryDto rawQueryDto) {
        try {
            if (rawQueryDto.isModifying()) {
                int affectedRows = rawQueryService.executeModifyingQuery(rawQueryDto.getQuery());
                return ResponseEntity.ok(new RawQueryResponseDto(null, affectedRows, null));
            }
            List result = rawQueryService.executeSelectQuery(rawQueryDto.getQuery());
            return ResponseEntity.ok(new RawQueryResponseDto(result, null, null));
        } catch (Exception e) {
            Throwable currentThrowable = e;
            while (currentThrowable.getCause() != null) {
                currentThrowable = currentThrowable.getCause();
            }
            currentThrowable.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new RawQueryResponseDto(
                    null, null, currentThrowable.getLocalizedMessage()
            ));
        }
    }


}

