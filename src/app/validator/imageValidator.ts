import { bytesToMB } from "@/lib/utils";

export function ImageValidator(
  name: string | undefined,
  size: number | undefined
): string | null {
  let flag: string | null = null;

  if (name) {
    const supportedExtension = ["jpg", "png", "jpeg", "gif", "svg"];
    const extension = name.split(".");
    if (!supportedExtension.includes(extension[1])) {
      flag = "Image must be .png,.jpeg,.jpg,.svg";
    } else {
      flag = null;
    }
  } else if (size) {
    const mb = bytesToMB(size);
    if (mb > 2) {
      flag = "Image should be less than 2 MB";
    } else {
      flag = null;
    }
  }

  return flag;
}
