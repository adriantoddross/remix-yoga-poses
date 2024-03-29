export type PoseRecord = {
  id: number;
  english_name: string;
  sanskrit: string;
  sanskrit_name_adapted: string;
  sanskrit_name: string;
  translation_name: string;
  pose_description: string;
  pose_benefits: string;
  url_svg: string;
  url_png: string;
  url_svg_alt: string;
  message: string; // Only present when a pose can't be found!
};

export type PoseCategory = {
  id: number;
  category_name: string;
  category_description: string;
  poses: PoseRecord[];
  message: string; // Only present when a pose can't be found!
};
