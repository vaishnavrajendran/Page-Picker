"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/lib/requests";

// FileUploadModal component
const FileUploadModal = ({ openUploadModal, closeModal }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      file: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values) => {
    if (values.file[0].type === "application/pdf") {
      uploadFile(values)
      console.log("VALUE", values);
    }
  };

  const handleClose = () => {
    form.reset();
    closeModal();
  };

  const onInputChange = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setSelectedFile("");
      return false;
    }

    const extension = files[0].name.split(".").pop();
    if (extension.toLowerCase() !== "pdf") {
      setDisplayError(true);
      setSelectedFile("");
    } else {
      setDisplayError(false);
      setSelectedFile(files[0].name);
    }
  };

  if (!isMounted) return null;

  return (
    <Dialog open={openUploadModal} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Upload your pdf
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                  Pdf:
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    disabled={isLoading}
                    className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                    placeholder="Enter channel name"
                    {...form.register("file")}
                    onChange={(e) => onInputChange(e)}
                  />
                </FormControl>
                <FormMessage>
                  {displayError && (
                    <span className="px-4">Uploaded file must be a PDF.</span>
                  )}
                </FormMessage>
              </FormItem>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                variant="primary"
                disabled={isLoading || selectedFile === ""}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
