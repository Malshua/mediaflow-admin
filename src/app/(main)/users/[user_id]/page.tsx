"use client";

import { PageLoader } from "@/components/elements";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleUser } from "@/hooks/userHooks";
import { formatDateAndTime } from "@/utilities/helpers";
import { Calendar, Layers, Mail, Shield } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import { CiUser } from "react-icons/ci";
import { FaIndustry, FaRegUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { ImCancelCircle } from "react-icons/im";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoLocationOutline, IoVideocam } from "react-icons/io5";
import { MdCamera } from "react-icons/md";

function UserDetails() {
  const { user_id } = useParams();

  const { data: SingleUser, isLoading } = useGetSingleUser({ user_id });

  const user_data = useMemo(() => {
    return SingleUser?.data?.data;
  }, [SingleUser]);

  const stats = [
    {
      label: "Campaigns",
      value: user_data?.statistics?.totalCampaigns,
      icon: <MdCamera className="text-[#7E00CC] text-xl" />,
      bg_color: "#FBF5FF",
    },
    {
      label: "Approved",
      value: user_data?.statistics?.approvedCampaigns,
      icon: <IoMdCheckmarkCircleOutline className="text-[#3CEC9A] text-xl" />,
      bg_color: "#ECFDF5",
    },
    {
      label: "Pending",
      value: user_data?.statistics?.pendingCampaigns,
      icon: <GrInProgress className="text-[#E6B800] text-xl" />,
      bg_color: "#FFF9E6",
    },
    {
      label: "Rejected",
      value: user_data?.statistics?.rejectedCampaigns,
      icon: <ImCancelCircle className="text-[#E5484D] text-xl" />,
      bg_color: "#FDECEC",
    },
    {
      label: "Media Plans",
      value: user_data?.statistics?.totalMediaPlans,
      icon: <IoVideocam className="text-[#EE9659] text-xl" />,
      bg_color: "#FDF3ED",
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="mt-32">
          <PageLoader />
        </div>
      ) : (
        <div className="mx-auto max-w-[1100px] p-4 space-y-8 mt-10 md:mt-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">User Details</h1>
              <p className="text-sm text-muted-foreground capitalize font-semibold">
                {user_data?.user?.details?.companyName}
              </p>
              <p className="text-sm text-muted-foreground">
                {user_data?.user?.email}
              </p>
            </div>
            <Badge variant="secondary" className="w-fit">
              {user_data?.user?.role}
            </Badge>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((stat, i) => (
              <Card key={i} className="rounded-2xl">
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-bold">{stat?.value}</p>
                  </div>
                  <div
                    className={`p-1 md:p-2 rounded-full bg-${stat?.bg_color}`}
                    style={{ backgroundColor: stat?.bg_color }}
                  >
                    {stat?.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User Info */}
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">User Information</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaRegUser className="h-4 w-4" />{" "}
                  {user_data?.user?.details?.companyName}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user_data?.user?.email}
                </div>
                <div className="flex items-center gap-2">
                  <FaIndustry className="h-4 w-4" />{" "}
                  {user_data?.user?.details?.industry}
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> {user_data?.user?.role} Role
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Joined{" "}
                  {formatDateAndTime(user_data?.user?.createdAt).Date}
                </div>
                <div className="flex items-center gap-2">
                  <IoLocationOutline className="h-4 w-4" />{" "}
                  {user_data?.user?.details?.companyAddress}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaigns */}
          {/* <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">Campaigns</h2>
              <p className="text-sm text-muted-foreground">
                No campaigns available for this user.
              </p>
            </CardContent>
          </Card> */}

          {/* Media Plans */}
          {/* <Card className="rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">Media Plans</h2>
              <p className="text-sm text-muted-foreground">
                No media plans created yet.
              </p>
            </CardContent>
          </Card> */}
        </div>
      )}
    </>
  );
}

export default UserDetails;
