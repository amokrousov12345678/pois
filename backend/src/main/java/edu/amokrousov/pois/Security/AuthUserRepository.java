package edu.amokrousov.pois.Security;

import edu.amokrousov.pois.Entity.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

//special hidden repository for Security purposes
//IT SHOULDN'T WORK!!!!!! (Two repositories for one entity is restricted by docs)
@RepositoryRestResource(exported = false)
public interface AuthUserRepository extends PagingAndSortingRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
