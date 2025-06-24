export default function Features() {
  return (
    <section className="bg-gray-950 text-white px-6 py-20">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="text-xl font-bold mb-2">⚡ Instant result</h3>
          <p className="text-gray-400">Analyzed immediately, without waiting.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">🧠 Smart algorithm</h3>
          <p className="text-gray-400">Created based on neural networks and psychology.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">🎯 Personalized report</h3>
          <p className="text-gray-400">You get only what suits you.</p>
        </div>
      </div>
    </section>
  );
}