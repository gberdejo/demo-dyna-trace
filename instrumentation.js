/*instrumentation.js*/
// Require dependencies
const { NodeSDK } = require("@opentelemetry/sdk-node");
const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-node");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
  AggregationTemporality,
} = require("@opentelemetry/sdk-metrics");

/**
 * Express and HTTP
 */
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-proto");
const {
  OTLPMetricExporter,
} = require("@opentelemetry/exporter-metrics-otlp-grpc");

const sdk = new NodeSDK({
  serviceName: "TuManboKing",
  // traceExporter: new ConsoleSpanExporter(),
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    // url: "<your-otlp-endpoint>/v1/traces",
    url: "https://ugt46381.live.dynatrace.com/api/v2/otlp/v1/traces",
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {
      Authorization:
        "Api-Token dt0c01.37QLPJI7XLTD6A2ANVVZBDCX.BZMPX4NV4GZST2EBWAXCZ7XRO626BFZLL5NKXXGZH25I22RQZRXUXOUZ26P35C74",
    },
  }),
  // metricReader: new PeriodicExportingMetricReader({
  //   exporter: new ConsoleMetricExporter(),
  // }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: "https://ugt46381.live.dynatrace.com/api/v2/otlp/v1/metrics", // url is optional and can be omitted - default is http://localhost:4318/v1/metrics
      headers: {
        Authorization:
          "Api-Token dt0c01.37QLPJI7XLTD6A2ANVVZBDCX.BZMPX4NV4GZST2EBWAXCZ7XRO626BFZLL5NKXXGZH25I22RQZRXUXOUZ26P35C74",
      }, // an optional object containing custom headers to be sent with each request
      // concurrencyLimit: 1, // an optional limit on pending requests
      temporalityPreference: AggregationTemporality.DELTA,
    }),
  }),
  instrumentations: [
    // getNodeAutoInstrumentations()
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

sdk.start();
