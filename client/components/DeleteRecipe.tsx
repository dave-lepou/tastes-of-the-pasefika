import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router' // 👈 Added
import { deleteRecipe } from '../apis/recipes.ts'

interface Props {
  id: number
}

export default function DeleteRecipe({ id }: Props) {
  const qc = useQueryClient()
  const navigate = useNavigate() // 👈 Added

  const deleteMutation = useMutation({
    mutationFn: () => deleteRecipe(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['recipes'] })
      navigate('/') // 👈 Added to redirect home after deletion
    },
  })

  const handleDelete = () => {
    console.log('deleting recipe', id)
    deleteMutation.mutate()
  }

  return (
    <>
      <button onClick={handleDelete} disabled={deleteMutation.isPending}>
        {deleteMutation.isPending ? 'Deleting...' : 'Delete Recipe'}
      </button>
    </>
  )
}
