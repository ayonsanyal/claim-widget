import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  token: string;
  apiUrl: string;
};

export default function App({ token, apiUrl }: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: '',
    description: '',
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const submit = async () => {
    try {
      setLoading(true);

      await axios.post(`${apiUrl}/claims`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStep(4);
    } catch {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
      >
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          File a Claim
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Quick and simple process
        </p>

        {/* Progress */}
        <div className="w-full bg-gray-200 h-2 rounded mb-6 overflow-hidden">
          <motion.div
            className="bg-blue-500 h-2"
            animate={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <label className="text-sm font-medium text-gray-700">
                What is your claim about?
              </label>

              <input
                autoFocus
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                placeholder="e.g. Phone damaged"
                value={data.title}
                onChange={(e) =>
                  setData({ ...data, title: e.target.value })
                }
              />

              <button
                disabled={!data.title}
                onClick={next}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 active:scale-95 transition disabled:bg-gray-300"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <label className="text-sm font-medium text-gray-700">
                Describe what happened
              </label>

              <textarea
                autoFocus
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
                placeholder="Explain your issue..."
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />

              <div className="flex gap-2">
                <button
                  onClick={back}
                  className="w-1/2 bg-gray-200 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Back
                </button>

                <button
                  disabled={!data.description}
                  onClick={next}
                  className="w-1/2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 active:scale-95 transition"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <p className="text-sm text-gray-600">
                Review your details
              </p>

              <div className="bg-gray-50 p-4 rounded-lg border text-sm">
                <p><strong>Title:</strong> {data.title}</p>
                <p className="mt-2">
                  <strong>Description:</strong> {data.description}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={back}
                  className="w-1/2 bg-gray-200 py-3 rounded-lg hover:bg-gray-300"
                >
                  Back
                </button>

                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-1/2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 active:scale-95 transition"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-3"
            >
              <div className="text-5xl">🎉</div>
              <h2 className="text-green-600 text-xl font-semibold">
                Claim Submitted!
              </h2>
              <p className="text-gray-600 text-sm">
                We’ll review it shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}