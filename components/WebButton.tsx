import { buttonSrc, type WebButton as WebButtonData } from "@/lib/buttons";

interface Props {
  button: WebButtonData;
}

/** One 88×31 GIF, wrapped in a link when it has somewhere to go. Plain img: Next's optimiser has nothing to add to a GIF. */
export default function WebButton({ button }: Props) {
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img className="webbtn" src={buttonSrc(button.file)} alt={button.alt} width={88} height={31} />;
  if (!button.href) return img;
  return (
    <a href={button.href} target="_blank" rel="noopener noreferrer" title={button.alt}>
      {img}
    </a>
  );
}
