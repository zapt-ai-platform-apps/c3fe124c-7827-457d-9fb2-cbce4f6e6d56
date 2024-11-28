import { createSignal, Show, For } from 'solid-js';
import { createEvent } from './supabaseClient';

function App() {
  const [petType, setPetType] = createSignal('');
  const [petDescription, setPetDescription] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [names, setNames] = createSignal([]);

  const handleGenerateNames = async (e) => {
    e.preventDefault();
    if (loading()) return; // Prevent multiple submissions
    setLoading(true);

    const prompt = `Suggest some names for a ${petType()} that is ${petDescription()}. Provide the names in a JSON array, with no other text.`;

    try {
      const result = await createEvent('chatgpt_request', {
        prompt: prompt,
        response_type: 'json',
      });

      setNames(result);
    } catch (error) {
      console.error('Error generating names:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-100 to-blue-100 text-gray-800">
      <h1 class="text-4xl font-bold mb-4">Name my pet</h1>

      <form onSubmit={handleGenerateNames} class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Type of pet</label>
          <input
            type="text"
            value={petType()}
            onInput={(e) => setPetType(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="e.g., dog, cat, hamster"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Describe your pet</label>
          <input
            type="text"
            value={petDescription()}
            onInput={(e) => setPetDescription(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            placeholder="e.g., small and energetic, brown fur, likes to play fetch"
            required
          />
        </div>
        <button
          type="submit"
          class={`w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          <Show when={!loading()} fallback="Generating...">
            Generate Names
          </Show>
        </button>
      </form>

      <Show when={names().length > 0}>
        <div class="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 class="text-2xl font-bold mb-4">Suggested Names</h2>
          <ul class="list-disc pl-5 space-y-2">
            <For each={names()}>
              {(name) => (
                <li class="text-gray-700">{name}</li>
              )}
            </For>
          </ul>
        </div>
      </Show>

      <div class="mt-8">
        <a href="https://www.zapt.ai" target="_blank" class="text-blue-500 hover:underline cursor-pointer">Made on ZAPT</a>
      </div>
    </div>
  );
}

export default App;