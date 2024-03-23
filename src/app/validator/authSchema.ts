import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  name: vine.string().minLength(2).maxLength(50),
  email: vine.string().email(),
  password: vine.string().minLength(5).maxLength(32).confirmed(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});

export const postSchema = vine.object({
  title: vine.string().minLength(3).maxLength(50),
  description: vine.string().minLength(10).maxLength(1000),
  image: vine.string(),
  user_id: vine.string()
});
