FROM openjdk:19-jdk-slim

VOLUME /tmp
COPY *.jar backend.jar
ENTRYPOINT ["java", "-jar", "/backend.jar"]
EXPOSE 8080