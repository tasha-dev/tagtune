"use client";

import { Loader2, Pen } from "lucide-react";
import { Button } from "../ui/button";
import { ID3Writer } from "browser-id3-writer";
import {
  DialogHeader,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";
import { EditAudioMetadataDialogProps } from "@/type/component";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { AudioTagsFormValues, audioTagsSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { removeAudioFormat } from "@/lib/util";
import { toast } from "sonner";

export default function EditAudioMetadataDialog({
  file,
  className,
}: EditAudioMetadataDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<AudioTagsFormValues>({
    resolver: zodResolver(audioTagsSchema),
    defaultValues: {
      title: removeAudioFormat(file.name),
    },
  });

  const onSubmit: SubmitHandler<AudioTagsFormValues> = async (data) => {
    try {
      const audioBuffer = await file.arrayBuffer();
      const writer = new ID3Writer(audioBuffer);

      if (data.title) writer.setFrame("TIT2", data.title);
      if (data.artist) writer.setFrame("TPE1", [data.artist]);
      if (data.albumArtist) writer.setFrame("TPE2", data.albumArtist);
      if (data.album) writer.setFrame("TALB", data.album);
      if (data.genre) writer.setFrame("TCON", [data.genre]);
      if (data.trackNumber) writer.setFrame("TRCK", data.trackNumber);
      if (data.discNumber) writer.setFrame("TPOS", data.discNumber);
      if (data.lyricist) writer.setFrame("TEXT", data.lyricist);
      if (data.publisher) writer.setFrame("TPUB", data.publisher);
      if (data.copyright) writer.setFrame("TCOP", data.copyright);
      if (data.bpm) writer.setFrame("TBPM", Number(data.bpm));
      if (data.key) writer.setFrame("TKEY", data.key);
      if (data.language) writer.setFrame("TLAN", data.language);
      if (data.isrc) writer.setFrame("TSRC", data.isrc);

      if (data.website) {
        writer.setFrame("WOAR", data.website);
      }

      if (data.comment) {
        writer.setFrame("COMM", {
          language: "eng",
          description: "",
          text: data.comment,
        });
      }

      if (data.lyrics) {
        writer.setFrame("USLT", {
          language: "eng",
          description: "",
          lyrics: data.lyrics,
        });
      }

      if (data.cover) {
        const coverBuffer = await data.cover.arrayBuffer();

        writer.setFrame("APIC", {
          type: 3,
          data: coverBuffer,
          description: "Cover",
        });
      }

      writer.addTag();

      const taggedBlob = writer.getBlob();

      const taggedFile = new File([taggedBlob], data.title, {
        type: file.type,
        lastModified: file.lastModified,
      });

      const url = URL.createObjectURL(taggedFile);

      const a = document.createElement("a");
      a.href = url;
      a.download = taggedFile.name;

      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);

      toast.success("Metadata updated successfully.");
    } catch {
      toast.error("Failed to update metadata.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              size={"icon"}
              variant={"secondary"}
              onClick={() => setOpen((prev) => !prev)}
              className={className}
            >
              <Pen />
            </Button>
          }
        />
        <TooltipContent>Edit metadata of the audio file</TooltipContent>
      </Tooltip>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!form.formState.isSubmitting) {
            setOpen(open);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit track info</DialogTitle>
            <DialogDescription>
              Updates the ID3 tags stored in : <br />
              <span className="font-bold text-card-foreground">
                {removeAudioFormat(file.name)}
              </span>
            </DialogDescription>
          </DialogHeader>
          <form action="#" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-3 mb-4">
              <Controller
                name="cover"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="cover">Cover Image</FieldLabel>

                    <Input
                      id="cover"
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0] ?? null);
                      }}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      placeholder="Song title"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="artist"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="artist">Artist</FieldLabel>
                    <Input
                      {...field}
                      id="artist"
                      placeholder="Artist"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="albumArtist"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="albumArtist">Album Artist</FieldLabel>
                    <Input
                      {...field}
                      id="albumArtist"
                      placeholder="Album artist"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="album"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="album">Album</FieldLabel>
                    <Input
                      {...field}
                      id="album"
                      placeholder="Album"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="genre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="genre">Genre</FieldLabel>
                    <Input
                      {...field}
                      id="genre"
                      placeholder="Genre"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="year"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="year">Year</FieldLabel>
                    <Input
                      {...field}
                      id="year"
                      placeholder="2025"
                      inputMode="numeric"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="trackNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="trackNumber">Track Number</FieldLabel>
                    <Input
                      {...field}
                      id="trackNumber"
                      placeholder="3/12"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="discNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="discNumber">Disc Number</FieldLabel>
                    <Input
                      {...field}
                      id="discNumber"
                      placeholder="1/2"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="composer"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="composer">Composer</FieldLabel>
                    <Input
                      {...field}
                      id="composer"
                      placeholder="Composer"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lyricist"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lyricist">Lyricist</FieldLabel>
                    <Input
                      {...field}
                      id="lyricist"
                      placeholder="Lyricist"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="publisher"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="publisher">Publisher</FieldLabel>
                    <Input
                      {...field}
                      id="publisher"
                      placeholder="Publisher"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="copyright"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="copyright">Copyright</FieldLabel>
                    <Input
                      {...field}
                      id="copyright"
                      placeholder="© 2025"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="bpm"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="bpm">BPM</FieldLabel>
                    <Input
                      {...field}
                      id="bpm"
                      placeholder="120"
                      inputMode="numeric"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="key"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="key">Key</FieldLabel>
                    <Input
                      {...field}
                      id="key"
                      placeholder="Am"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="language"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="language">Language</FieldLabel>
                    <Input
                      {...field}
                      id="language"
                      placeholder="eng"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="isrc"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="isrc">ISRC</FieldLabel>
                    <Input
                      {...field}
                      id="isrc"
                      placeholder="USUM71703861"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="encoder"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="encoder">Encoder</FieldLabel>
                    <Input
                      {...field}
                      id="encoder"
                      placeholder="TagTune"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="website"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="website">Website</FieldLabel>
                    <Input
                      {...field}
                      id="website"
                      placeholder="https://example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="comment"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="comment">Comment</FieldLabel>
                    <Textarea
                      {...field}
                      id="comment"
                      rows={4}
                      placeholder="Comment..."
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lyrics"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="lyrics">Lyrics</FieldLabel>
                    <Textarea
                      {...field}
                      id="lyrics"
                      rows={8}
                      placeholder="Song lyrics..."
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <DialogFooter>
              <DialogClose
                render={
                  <Button
                    disabled={form.formState.isSubmitting}
                    type="button"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                }
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Pen />
                )}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
