import { sleep } from "../common/utils";

export const onSubmit: (values: Record<string, FormDataEntryValue>) => Promise<void> = async (formData) => {
  console.log('Submitting...', formData);
  await sleep(1000);
  console.log('Finished submitting', formData);

  const chance = Math.random();
  if (chance < 0.2) {
    throw new Error(`That had a 20% chance. Try again.`)
  }
}