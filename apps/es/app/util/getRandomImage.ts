export interface BgImageProps {
	src: string;
	alt: string;
	width: number;
	height: number;
}
export const bgImages: BgImageProps[] = [
	{
		src: "/img/home/blonde-city.jpg",
		alt: "Rubia mirando al ciudad",
		width: 1300,
		height: 867,
	},
	{
		src: "/img/home/clouds-man.jpg",
		alt: "Espalda de hombre con sky y nubes en el cielo",
		width: 1300,
		height: 863,
	},
	{
		src: "/img/home/man-falling.jpg",
		alt: "Hombre cayendo",
		width: 1300,
		height: 844,
	},
	{
		src: "/img/home/man-ocean-sunset.jpg",
		alt: "Hombre mirando el oceano",
		width: 1300,
		height: 867,
	},
	{
		src: "/img/home/person-guy.jpg",
		alt: "Hombre sentado mirando la ciudad",
		width: 1300,
		height: 760,
	},
	{
		src: "/img/home/woman-moto.jpg",
		alt: "Mujer de espaldas en su moto",
		width: 1300,
		height: 865,
	},
	{
		src: "/img/home/girl-horizont.jpg",
		alt: "Niña mirando el horizonte",
		width: 1300,
		height: 868,
	},
	{
		src: "/img/home/girl-street.jpg",
		alt: "Mujer mirando la calle",
		width: 1300,
		height: 867,
	},
	{
		src: "/img/home/woman-mountain.jpg",
		alt: "Mujer de espaldas en una montaña",
		width: 1300,
		height: 867,
	},
];

const getRandomImage = () =>
	bgImages[Math.floor(Math.random() * bgImages.length)] as BgImageProps;

export default getRandomImage;
