const RUNTIME_MESSAGES = [
    "Inbound payload batch processed successfully via Kafka partitions.",
    "Buffer allocation adjusted dynamically for the primary socket pool.",
    "Redis cache hit optimization validation checkpoint completed: OK.",
    "Flushed structural execution statistics to telemetry log storage.",
    "Garbage collection cycle executed cleanly inside heap memory structures.",
    "Network ingestion socket group load-balanced across subnets.",
    "Microservices verification passed: Ingestion routing nodes responsive."
];

export function generateMetricsUpdate() {
    const dynamicFactor = Math.sin(Date.now() / 5000);

    const requestsPerSecond = Math.floor(320 + (dynamicFactor * 80) + (Math.random() * 30));
    const activeConnections = Math.floor(1250 + (dynamicFactor * 25) + (Math.random() * 10));
    const avgLatency = Math.floor(13 + (Math.random() * 4));

    const errorRate = (Math.random() > 0.92) ? (0.02 + Math.random() * 0.03).toFixed(3) : "0.021";

    let systemStatus = "OPTIMAL";
    if (avgLatency > 15 || parseFloat(errorRate) > 0.04) {
        systemStatus = "LOAD_WARNING";
    }

    return {
        requestsPerSecond,
        activeConnections,
        avgLatency,
        errorRate,
        systemStatus
    };
}

export function getSystemLogs() {
    const currentTime = new Date();
    const timeString = currentTime.toTimeString().split(' ')[0];
    const targetedMessage = RUNTIME_MESSAGES[Math.floor(Math.random() * RUNTIME_MESSAGES.length)];

    return {
        id: Math.random().toString(36).substring(2, 9),
        time: timeString,
        text: targetedMessage
    };
}