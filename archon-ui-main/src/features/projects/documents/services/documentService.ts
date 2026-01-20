/**
 * Document Service
 * Handles API calls for project documents via Archon MCP
 */

import { callAPIWithETag } from "../../../shared/api/apiClient";
import type { ProjectDocument, RenameFolderRequest, MoveDocumentsRequest } from "../types";

interface DocumentsResponse {
  success: boolean;
  documents: ProjectDocument[];
  count: number;
  total: number;
}

export const documentService = {
  /**
   * Get all documents for a project
   */
  async getDocumentsByProject(projectId: string): Promise<ProjectDocument[]> {
    const response = await callAPIWithETag<DocumentsResponse>(`/api/projects/${projectId}/docs?include_content=true`);
    return response.documents || [];
  },

  /**
   * Get a single document by ID
   */
  async getDocument(projectId: string, documentId: string): Promise<ProjectDocument> {
    const response = await callAPIWithETag<{ success: boolean; document: ProjectDocument }>(
      `/api/projects/${projectId}/docs/${documentId}`,
    );
    if (!response.document) {
      throw new Error(`Document not found: ${documentId} in project ${projectId}`);
    }
    return response.document;
  },

  /**
   * Update a document
   */
  async updateDocument(
    projectId: string,
    documentId: string,
    updates: { content?: unknown; title?: string; tags?: string[]; folder_path?: string },
  ): Promise<ProjectDocument> {
    const response = await callAPIWithETag<{ success: boolean; document: ProjectDocument }>(
      `/api/projects/${projectId}/docs/${documentId}`,
      {
        method: "PUT",
        body: JSON.stringify(updates),
      },
    );
    if (!response.document) {
      throw new Error(`Failed to update document: ${documentId} in project ${projectId}`);
    }
    return response.document;
  },

  /**
   * Delete a document
   */
  async deleteDocument(projectId: string, documentId: string): Promise<void> {
    await callAPIWithETag<{ success: boolean; message: string }>(`/api/projects/${projectId}/docs/${documentId}`, {
      method: "DELETE",
    });
  },

  /**
   * Get all folders in a project
   */
  async getFolders(projectId: string): Promise<string[]> {
    const response = await callAPIWithETag<{ folders: string[]; total_count: number }>(
      `/api/projects/${projectId}/folders`,
    );
    return response.folders || ["/"];
  },

  /**
   * Rename a folder
   */
  async renameFolder(projectId: string, request: RenameFolderRequest): Promise<void> {
    await callAPIWithETag<{ message: string; updated_count: number }>(
      `/api/projects/${projectId}/folders/rename`,
      {
        method: "PUT",
        body: JSON.stringify(request),
      },
    );
  },

  /**
   * Move documents to a folder
   */
  async moveDocuments(projectId: string, request: MoveDocumentsRequest): Promise<void> {
    await callAPIWithETag<{ message: string; updated_count: number }>(`/api/projects/${projectId}/docs/move`, {
      method: "PUT",
      body: JSON.stringify(request),
    });
  },
};
