
FROM openjdk:22-jdk AS build

COPY ./target/restaurant_spring-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]