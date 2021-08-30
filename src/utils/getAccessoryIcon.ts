import SpeedSvg from "../assets/speed.svg";
import AccelerationSvg from "../assets/acceleration.svg";
import ForceSvg from "../assets/force.svg";
import GasolineSvg from "../assets/gasoline.svg";
import ExchangeSvg from "../assets/exchange.svg";
import PeopleSvg from "../assets/people.svg";
import HybridSvg from "../assets/hybrid.svg";
import EletricSvg from "../assets/energy.svg";

export function getAccessoryIcon(fuel_type: string) {
  const icons = {
    speed: SpeedSvg,
    acceleration: AccelerationSvg,
    turning_diameter: ForceSvg,
    electric_motor: EletricSvg,
    gasoline_motor: GasolineSvg,
    hybrid_motor: HybridSvg,
    exchange: ExchangeSvg,
    electric: EletricSvg,
    seats: PeopleSvg,
  };

  return icons[fuel_type] ?? GasolineSvg;
}
