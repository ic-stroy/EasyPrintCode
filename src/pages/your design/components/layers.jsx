import LayerTSVG from "../../../layouts/icons/layer-t";
import Reveal from "../../../animation";
import LayerDublicateSVG from "../../../layouts/icons/layer-dublicate";
import LayerTrashSVG from "../../../layouts/icons/layer-trash";
import ImageSVG from "../../../layouts/icons/image";

const LayersContent = ({
  text,
  deleteAction,
  isActive,
  index,
  SetActiveLayer,
  dublicateElement,
  type,
}) => (
  <div
    onClick={() => {
      SetActiveLayer(index);
    }}
  >
    <div
      className="layers_div"
      style={{
        ...(isActive === index && {
          border: "1px solid",
          background: "#d3e1fb",
        }),
      }}
    >
      {type === "text" ? (
        <LayerTSVG w={30} h={30} />
      ) : (
        <ImageSVG w={30} h={30} />
      )}
      <h3 className="layers_text_value">{text}</h3>
      <div
        style={{ display: "grid", placeItems: "center" }}
        onClick={() => dublicateElement(index)}
      >
        <LayerDublicateSVG />
      </div>
      <div
        style={{ display: "grid", placeItems: "center" }}
        onClick={() => deleteAction(index)}
      >
        <LayerTrashSVG />
      </div>
    </div>
  </div>
);

const LayersText = () => (
  <Reveal>
    <p className="layers_text">
      {localStorage.getItem("selectedLanguage") === "ru"
        ? "Добавленные объекты будут отображаться здесь"
        : `Qo'shilgan ob'ektlar bu yerda ko'rsatiladi`}
    </p>
  </Reveal>
);

export const Layers = ({
  isActive,
  contents,
  deleteElement,
  SetActiveLayer,
  dublicateElement,
}) => {
  let imageCounter = 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {contents.length ? (
        contents.map((item) => {
          let displayText;

          if (item.type === "image") {
            imageCounter += 1;
            displayText = `Фото ${imageCounter}`;
          } else {
            displayText = item.text;
          }

          return (
            <LayersContent
              key={item.uniqueKey}
              text={displayText}
              deleteAction={deleteElement}
              isActive={isActive}
              index={item.uniqueKey}
              SetActiveLayer={SetActiveLayer}
              dublicateElement={dublicateElement}
              type={item.type}
            />
          );
        })
      ) : (
        <LayersText />
      )}
    </div>
  );
};
