package com.restaurant.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.apache.commons.lang3.StringUtils;

@Aspect
@Component
public class LogTimeAspect {

    Logger log = LoggerFactory.getLogger(LogTimeAspect.class);

    @Around(value = "execution(* com.restaurant.services..*(..))")
    public Object logTime(ProceedingJoinPoint joinPoint) throws Throwable {

        long startTime = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder("KPI:");
        sb.append("[").append(joinPoint.getKind()).append("]\tfor: ").append(joinPoint.getSignature())
                .append("\twithArgs: ").append("(").append(StringUtils.join(joinPoint.getArgs(), ",")).append(")");
        sb.append("\ttook: ");
        Object returnValue = joinPoint.proceed();
        log.info(sb.append(System.currentTimeMillis() - startTime).append("ms.").toString());

        return returnValue;

    }

}
