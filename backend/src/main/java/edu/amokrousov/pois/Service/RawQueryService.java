package edu.amokrousov.pois.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class RawQueryService {

    @Autowired
    EntityManager entityManager;

    public List executeSelectQuery(String query) {
        return entityManager.createNativeQuery(query).getResultList();
    }

    @Transactional
    public int executeModifyingQuery(String query) {
        System.out.println("Update query: " + query);
        return entityManager.createNativeQuery(query).executeUpdate();
    }
}
