export default function ImageBlock({ src }) {
  return (
    <div className="my-10">
   <img
  src={src}
  className="w-full max-w-3xl mx-auto rounded-xl shadow-sm"
  loading="lazy"
/>

    </div>
  );
}
