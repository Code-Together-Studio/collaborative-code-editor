FROM openjdk:11-ea-19-jre

VOLUME /tmp
COPY *.jar backend.jar
ENTRYPOINT ["java", "-jar", "/backend.jar"]
EXPOSE 8080