package edu.amokrousov.pois.Repository;

import edu.amokrousov.pois.Entity.User;
import org.springframework.context.annotation.Primary;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;

@Primary
@PreAuthorize("hasAuthority('PRIV_SUDO')")
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
}
