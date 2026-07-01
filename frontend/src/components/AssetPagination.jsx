export default function AssetPagination({ current, setCurrent, total, side }) {

  if (side === "left") {
    return (
      <button
        disabled={current === 0}
        onClick={() => setCurrent(Math.max(0, current - 1))}
        className="text-4xl text-white disabled:text-gray-600"
      >
        ◀
      </button>
    );
  }

  if (side === "right") {
    return (
      <button
        disabled={current + 3 >= total}
        onClick={() => setCurrent(current + 1)}
        className="text-4xl text-white disabled:text-gray-600"
      >
        ▶
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        disabled={current === 0}
        onClick={() => setCurrent(Math.max(0, current - 1))}
        className="text-4xl text-white disabled:text-gray-600"
      >
        ◀
      </button>
      <button
        disabled={current + 3 >= total}
        onClick={() => setCurrent(current + 1)}
        className="text-4xl text-white disabled:text-gray-600"
      >
        ▶
      </button>
    </div>
  );
}