import { PredictionResponse } from "../../services/predictionService";

interface Props {
  data: PredictionResponse;
}

export default function PredictionResult({ data }: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold">
        {data.company}
      </h2>

      <p className="mt-2">
        Symbol: {data.symbol}
      </p>

      <p>
        Current Price: ${data.current_price}
      </p>

      <hr className="my-5"/>

      <h3>
        Prediction: {data.prediction}
      </h3>

      <p>
        Confidence: {data.confidence}%
      </p>

      <p>
        Signal: {data.signal}
      </p>

      <p>
        Risk: {data.risk}
      </p>

      <p>
        Expected Return: {data.expected_return}%
      </p>

      <div className="mt-6">

        <h4 className="font-bold">
          AI Reasons
        </h4>

        <ul className="mt-2 list-disc pl-5">

          {data.reasons.map((reason) => (
            <li key={reason}>
              {reason}
            </li>
          ))}

        </ul>

      </div>

    </div>
  );
}