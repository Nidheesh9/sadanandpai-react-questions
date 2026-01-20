import { useState, useEffect, useRef } from "react";

export default function AdvancedCounter() {
  const [count, setCount] = useState(100);
  const [delay, setDelay] = useState(3000);
  const [incrementValue, setIncrementValue] = useState(100);
  const [lowerLimit, setLowerLimit] = useState(-1000);
  const [upperLimit, setUpperLimit] = useState(1000);
  const [isAsyncIncrement, setIsAsyncIncrement] = useState(false);
  const [isAsyncDecrement, setIsAsyncDecrement] = useState(false);

  const incrementTimerRef = useRef(null);
  const decrementTimerRef = useRef(null);

  useEffect(() => {
    if (isAsyncIncrement) {
      incrementTimerRef.current = setInterval(() => {
        setCount((prev) => {
          const newValue = prev + incrementValue;
          if (newValue > upperLimit) {
            setIsAsyncIncrement(false);
            return prev;
          }
          return newValue;
        });
      }, delay);
    } else {
      if (incrementTimerRef.current) {
        clearInterval(incrementTimerRef.current);
      }
    }

    return () => {
      if (incrementTimerRef.current) {
        clearInterval(incrementTimerRef.current);
      }
    };
  }, [isAsyncIncrement, incrementValue, delay, upperLimit]);

  // Auto decrement
  useEffect(() => {
    if (isAsyncDecrement) {
      decrementTimerRef.current = setInterval(() => {
        setCount((prev) => {
          const newValue = prev - incrementValue;
          if (newValue < lowerLimit) {
            setIsAsyncDecrement(false);
            return prev;
          }
          return newValue;
        });
      }, delay);
    } else {
      if (decrementTimerRef.current) {
        clearInterval(decrementTimerRef.current);
      }
    }

    return () => {
      if (decrementTimerRef.current) {
        clearInterval(decrementTimerRef.current);
      }
    };
  }, [isAsyncDecrement, incrementValue, delay, lowerLimit]);

  const handleIncrement = () => {
    setCount((prev) => {
      const newValue = prev + incrementValue;
      return newValue > upperLimit ? prev : newValue;
    });
  };

  const handleDecrement = () => {
    setCount((prev) => {
      const newValue = prev - incrementValue;
      return newValue < lowerLimit ? prev : newValue;
    });
  };

  const handleReset = () => {
    setCount(100);
    setIsAsyncIncrement(false);
    setIsAsyncDecrement(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Advanced Counter
        </h1>

        <div className="text-center mb-8">
          <div className="text-7xl font-bold text-gray-900 mb-6">{count}</div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleDecrement}
              className="w-12 h-12 border-2 border-gray-900 text-gray-900 text-2xl font-bold rounded hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <button
              onClick={handleIncrement}
              className="w-12 h-12 border-2 border-gray-900 text-gray-900 text-2xl font-bold rounded hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setIsAsyncDecrement(!isAsyncDecrement)}
              className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-semibold rounded hover:bg-gray-100 transition-colors"
            >
              {isAsyncDecrement ? "Stop" : "async -"}
            </button>
            <button
              onClick={() => setIsAsyncIncrement(!isAsyncIncrement)}
              className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-semibold rounded hover:bg-gray-100 transition-colors"
            >
              {isAsyncIncrement ? "Stop" : "+ async"}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-900 font-medium">Delay</label>
            <span className="text-gray-900 font-medium">{delay / 1000}s</span>
          </div>
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
            style={{
              accentColor: "#3b82f6",
            }}
          />
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <label className="text-gray-900 font-medium w-64">
              Increment/Decrement by
            </label>
            <input
              type="number"
              value={incrementValue}
              onChange={(e) => setIncrementValue(Number(e.target.value))}
              className="w-24 px-3 py-2 border-2 border-gray-900 rounded text-center font-medium"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-900 font-medium w-64">
              Lower Limit
            </label>
            <input
              type="number"
              value={lowerLimit}
              onChange={(e) => setLowerLimit(Number(e.target.value))}
              className="w-24 px-3 py-2 border-2 border-gray-900 rounded text-center font-medium"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-900 font-medium w-64">
              Upper Limit
            </label>
            <input
              type="number"
              value={upperLimit}
              onChange={(e) => setUpperLimit(Number(e.target.value))}
              className="w-24 px-3 py-2 border-2 border-gray-900 rounded text-center font-medium"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="px-8 py-2 border-2 border-gray-900 text-gray-900 font-semibold rounded hover:bg-gray-100 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
