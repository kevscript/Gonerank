import ClubForm, { ClubFormInput } from "@/components/forms/ClubForm";
import ShieldIcon from "@/components/Icons/Shield";
import { NextCustomPage } from "@/pages/_app";
import { Club } from "@prisma/client";
import {
  useGetClubsQuery,
  useUpdateClubMutation,
} from "graphql/generated/queryTypes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type EditClubFormInput = {
  name: string;
  abbreviation: string;
  primary: string;
  secondary: string;
  logo: string;
};

const AdminClubEditPage: NextCustomPage = () => {
  const { data, loading, error } = useGetClubsQuery();
  const [club, setClub] = useState<Club | null>(null);
  const router = useRouter();
  const { clubId } = router.query;

  const [updateClub] = useUpdateClubMutation({
    onCompleted: () => router.push("/admin/clubs"),
  });

  const handleUpdateClub = (data: ClubFormInput) => {
    club && updateClub({ variables: { id: club.id, data: data } });
  };

  useEffect(() => {
    const currClub = data?.clubs.find((c) => c.id === clubId);
    currClub && setClub(currClub);
  }, [data, clubId]);

  return (
    <div className="px-8 py-16 lg:px-16">
      <h3 className="text-xl">Edit club : {club?.name}</h3>
      <div className="mt-12">
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
        {club && (
          <div className="p-4">
            <ClubForm
              onSubmit={handleUpdateClub}
              defaultValues={{
                name: club.name,
                abbreviation: club.abbreviation,
                primary: club.primary,
                secondary: club.secondary,
                logo: club.logo,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

AdminClubEditPage.isAdminPage = true;

export default AdminClubEditPage;
