FROM openjdk:9
ADD target/kick-scooter-gateway.jar kick-scooter-gateway.jar
ENTRYPOINT ["java", "-jar", "kick-scooter-gateway.jar"]